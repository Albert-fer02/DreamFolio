import { getFirebaseAuth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

export interface AdminUser {
  uid: string;
  email: string;
  isAdmin: boolean;
}

// 🔐 Lista de administradores autorizados
const ADMIN_EMAILS = [
  'admin@dreamfolio.dev',
  'dreamcoder08@gmail.com', // Agregar tu email aquí
  // Agregar más emails admin aquí
];

export const adminAuth = {
  // Verificar si el usuario es admin
  isAdmin: async (user: any): Promise<boolean> => {
    if (!user || !user.email) return false;
    
    // Verificar email en la lista de admins
    const isAuthorized = ADMIN_EMAILS.includes(user.email.toLowerCase());
    
    // TODO: También verificar custom claims en Firebase
    // const tokenResult = await user.getIdTokenResult();
    // return tokenResult.claims.admin === true;
    
    return isAuthorized;
  },

  // Login admin
  loginAdmin: async (email: string, password: string): Promise<AdminUser | null> => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error('Firebase Auth not initialized');

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Verificar si es admin
      const isAdminUser = await adminAuth.isAdmin(user);
      if (!isAdminUser) {
        await signOut(auth);
        throw new Error('Unauthorized: Not an admin user');
      }

      return {
        uid: user.uid,
        email: user.email!,
        isAdmin: true,
      };
    } catch (error) {
      console.error('Admin login failed:', error);
      return null;
    }
  },

  // Logout admin
  logoutAdmin: async (): Promise<void> => {
    try {
      const auth = getFirebaseAuth();
      if (auth) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Admin logout failed:', error);
    }
  },

  // Obtener usuario admin actual
  getCurrentAdmin: (): Promise<AdminUser | null> => {
    return new Promise((resolve) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        resolve(null);
        return;
      }

      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        
        if (user && await adminAuth.isAdmin(user)) {
          resolve({
            uid: user.uid,
            email: user.email!,
            isAdmin: true,
          });
        } else {
          resolve(null);
        }
      });
    });
  },
};

// 🔒 Hook para componentes React
export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await adminAuth.getCurrentAdmin();
      setAdminUser(admin);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  return { adminUser, loading, isAdmin: !!adminUser };
};

// Para usar en server components
export { adminAuth as default }; 