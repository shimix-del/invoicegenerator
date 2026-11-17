export type PlanTier = 'free' | 'pro' | 'business';

export interface UserSubscription {
  plan: PlanTier;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'trialing' | 'canceled' | 'past_due';
  trialEndsAt?: string;
  renewsAt?: string;
  cancelAtPeriodEnd?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  subscription: UserSubscription;
  invoicesCreatedThisMonth: number;
  monthlyLimit: number; // 5 for free, Infinity for pro
  savedTemplatesUnlocked: string[];
}
