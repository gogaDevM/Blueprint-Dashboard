import { Session, DefaultUser } from "next-auth";

export interface AuthenticatedSession extends Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
  customer: {
    company_member: any;
    user: {
      email?: string;
    };
  };
}

export interface User extends DefaultUser {
  tokens?: {
    access: string;
    refresh: string;
  };
  token?: string;
}

export interface JobsProps {}

export interface LoginFormInputs {
  email: string;
  username?: string;
  password: string;
}

export interface Filter {
  name: {
    api: string;
    display: string;
  };
  values: any[];
}

export interface Company {
  id?: number;
  slug?: string;
  image_logo?: string | null;
  image_banner?: string | null;
  image_card?: string | null;
  name?: string;
  colour?: string;
  status?: boolean;
  sponsored?: boolean;
  redirect?: boolean;
  location?: any;
  live_jobs?: string;
  branding_channel?: boolean;
  companySlug?: string;
  currentUser?: any;
  company?: any;
  partners?: any[];
  subscription?: SubscriptionData;
  cards?: any;
}

export interface SubscriptionData {
  id?: number;
  vpo?: any;
  coupon?: any;
  package?: {
    id?: number;
    slug?: string;
    title?: string;
    type?: string;
    price?: number;
    credits?: number;
    currency?: string;
    hero_title?: string;
    subtitle?: string;
    cta?: string;
    image?: string;
    description?: string;
    validity?: number;
    onboarding_message?: string;
    form_title?: string;
    form_cta?: string | null;
    primary_color?: string | null;
    terms_url?: string | null;
    policy_url?: string | null;
    benefits?: string[];
  };
  credits?: number;
  jobbions?: number;
  transaction_no?: string | null;
  package_pop_up?: string | null;
  expires_at?: string;
  paid_at?: string | null;
  cancelled_at?: string | null;
  updated_at?: string;
  created_at?: string | null;
  company?: number;
}

export interface PartnerData {
  id?: number;
  name?: string;
  has_company?: boolean;
}

type Category = {
  id?: number;
  name?: string;
};

type Channel = {
  id?: number;
  name?: string;
};

type CompanyData = {
  id?: number;
  name?: string;
  slug?: string;
};

export type ArticlesData = {
  id?: number;
  image: string | null;
  categories?: Category[];
  channels?: Channel[];
  companies?: CompanyData[];
  slug?: string;
  title?: string;
  description?: string;
  text: string;
  link?: string | null;
  featured?: boolean;
  views?: number;
  posted_at?: string;
  posted_by?: string;
  deleted_at?: string | null;
};

export interface Location {
  raw?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  country_short?: string;
  label?: string;
  value?: string;
}
