
import { supabase } from './client';
import { toast } from 'sonner';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  name?: string;
};

export async function signIn({ email, password }: SignInCredentials) {
  try {
    console.log('Signing in with:', { email });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      toast.error(error.message);
      return { user: null, error };
    }

    console.log('Sign in successful', data);
    toast.success('Connexion réussie!');
    return { user: data.user, session: data.session, error: null };
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    toast.error('Une erreur est survenue lors de la connexion');
    return { user: null, error: err };
  }
}

export async function signUp({ email, password, name }: SignUpCredentials) {
  try {
    console.log('Signing up with:', { email, name });
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        },
      },
    });

    if (error) {
      console.error('Sign up error:', error);
      toast.error(error.message);
      return { user: null, error };
    }

    console.log('Sign up successful', data);
    toast.success('Compte créé avec succès!');
    return { user: data.user, session: data.session, error: null };
  } catch (err) {
    console.error('Erreur lors de la création du compte:', err);
    toast.error('Une erreur est survenue lors de la création du compte');
    return { user: null, error: err };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return { error };
    }
    toast.success('Déconnexion réussie!');
    return { error: null };
  } catch (err) {
    console.error('Erreur lors de la déconnexion:', err);
    toast.error('Une erreur est survenue lors de la déconnexion');
    return { error: err };
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return { user: null, error };
    }
    return { user: data.user, error: null };
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', err);
    return { user: null, error: err };
  }
}
