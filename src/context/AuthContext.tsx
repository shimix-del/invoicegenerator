import React, { createContext, useContext, useEffect, useState } from 'react';
import { PlanTier, UserProfile } from '../types/user';
import { loadUserProfile, saveUserProfile } from '../utils/storage';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  isPro: boolean;
  isBusiness: boolean;
  invoicesLeft: number;
  canCreateInvoice: boolean;
  startFreeTrial: () => void;
  upgradeToPlan: (plan: PlanTier, billingCycle?: 'monthly' | 'yearly') => void;
  cancelSubscription: () => void;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  incrementInvoiceCount: () => boolean;
  unlockTemplatePack: (templateId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => loadUserProfile());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    saveUserProfile(user);
  }, [user]);

  const isPro = user.subscription.plan === 'pro' || user.subscription.plan === 'business' || user.subscription.status === 'trialing';
  const isBusiness = user.subscription.plan === 'business';
  
  const invoicesLeft = isPro ? Infinity : Math.max(0, user.monthlyLimit - user.invoicesCreatedThisMonth);
  const canCreateInvoice = isPro || invoicesLeft > 0;

  const startFreeTrial = () => {
    const trialDays = 7;
    const trialEndsAt = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000).toISOString();
    
    setUser((prev) => ({
      ...prev,
      subscription: {
        plan: 'pro',
        billingCycle: 'monthly',
        status: 'trialing',
        trialEndsAt,
      },
    }));

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const upgradeToPlan = (plan: PlanTier, billingCycle: 'monthly' | 'yearly' = 'monthly') => {
    setUser((prev) => ({
      ...prev,
      subscription: {
        plan,
        billingCycle,
        status: 'active',
        renewsAt: new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
      },
      monthlyLimit: plan === 'free' ? 5 : Infinity,
    }));

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  const cancelSubscription = () => {
    setUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        cancelAtPeriodEnd: true,
      },
    }));
  };

  const signIn = (email: string, name?: string) => {
    setUser((prev) => ({
      ...prev,
      email,
      name: name || email.split('@')[0],
    }));
    setIsLoggedIn(true);
  };

  const signOut = () => {
    setIsLoggedIn(false);
  };

  const incrementInvoiceCount = (): boolean => {
    if (!canCreateInvoice) return false;
    
    setUser((prev) => ({
      ...prev,
      invoicesCreatedThisMonth: prev.invoicesCreatedThisMonth + 1,
    }));
    return true;
  };

  const unlockTemplatePack = (templateId: string) => {
    setUser((prev) => {
      if (prev.savedTemplatesUnlocked.includes(templateId)) return prev;
      return {
        ...prev,
        savedTemplatesUnlocked: [...prev.savedTemplatesUnlocked, templateId],
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isPro,
        isBusiness,
        invoicesLeft,
        canCreateInvoice,
        startFreeTrial,
        upgradeToPlan,
        cancelSubscription,
        signIn,
        signOut,
        incrementInvoiceCount,
        unlockTemplatePack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
