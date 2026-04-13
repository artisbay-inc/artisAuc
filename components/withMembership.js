/**
 * withMembership.js
 * Higher-order component to protect pages that require membership
 * Redirects to membership page if user doesn't have valid membership
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkMembership } from '../utils/membership';

export default function withMembership(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const hasMembership = checkMembership();
      
      if (!hasMembership) {
        // Store intended destination
        localStorage.setItem('redirectAfterMembership', router.asPath);
        router.push('/membership');
      }
    }, [router]);

    // Still render the component - membership check will redirect if needed
    return <Component {...props} />;
  };
}
