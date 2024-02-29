import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { AuthProvider } from '../utils/context/authContext';
import '../styles/globals.css';
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <Providers>
            <ViewDirectorBasedOnUserAuthStatus>
              {children}
            </ViewDirectorBasedOnUserAuthStatus>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
