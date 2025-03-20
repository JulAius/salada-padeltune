
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { signOut, getCurrentUser } from '../../utils/supabase/auth';
import { LogOut, User } from 'lucide-react';
import AuthForm from './AuthForm';
import { supabase } from '../../utils/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const UserMenu: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { user: currentUser } = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    
    loadUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user || null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="w-36 h-10 bg-gray-700 animate-pulse rounded-md"></div>;
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-gray-200 border-gray-600 hover:bg-gray-700">
          <User className="h-4 w-4 mr-2 text-padel-blue" />
          {user.user_metadata?.name || user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <AuthForm />
  );
};

export default UserMenu;
