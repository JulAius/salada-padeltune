
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';
import AuthForm from './AuthForm';
import { supabase } from '../../utils/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const UserMenu: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    // Simulate signout since we're not using authentication anymore
    setUser(null);
    toast({
      title: "Fonctionnalité désactivée",
      description: "L'authentification a été remplacée par un système de code unique.",
      variant: "destructive"
    });
  };

  if (loading) {
    return <div className="w-36 h-10 bg-gray-700 animate-pulse rounded-md"></div>;
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-gray-200 border-gray-600 hover:bg-gray-700">
          <User className="h-4 w-4 mr-2 text-padel-blue" />
          {user.user_metadata?.name || user.email || 'Utilisateur'}
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
