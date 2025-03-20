
import { supabase } from './client';
import { toast } from '@/hooks/use-toast';

/**
 * This file is deprecated. Authentication has been replaced with a unique code system.
 * Keeping stub functions for compatibility with existing imports.
 */

export interface AuthResponse {
  user: any | null;
  error: Error | null;
}

export async function signIn(credentials: { email: string; password: string }): Promise<AuthResponse> {
  toast({
    title: "Fonctionnalité désactivée",
    description: "L'authentification a été remplacée par un système de code unique.",
    variant: "destructive"
  });
  
  return {
    user: null,
    error: new Error("Authentication system has been replaced with unique codes")
  };
}

export async function signUp(credentials: { email: string; password: string; name?: string }): Promise<AuthResponse> {
  toast({
    title: "Fonctionnalité désactivée",
    description: "L'authentification a été remplacée par un système de code unique.",
    variant: "destructive"
  });
  
  return {
    user: null,
    error: new Error("Authentication system has been replaced with unique codes")
  };
}

export async function signOut(): Promise<{ error: Error | null }> {
  return { error: null };
}

export async function getCurrentUser(): Promise<{ user: any | null }> {
  return { user: null };
}
