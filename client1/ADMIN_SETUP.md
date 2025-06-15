# Admin User Sample

This project now includes a complete admin user system with role-based access control.

## Sample Users

Two sample users have been created in `public/users.json`:

### Admin User
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: `admin`
- **Username**: `admin`
- **Phone**: `+1234567890`

### Regular User
- **Email**: `user@example.com`
- **Password**: `user123`
- **Role**: `user`
- **Username**: `johndoe`
- **Phone**: `+1987654321`

## Features

### Authentication System
- JWT-like authentication using localStorage
- Role-based access control
- Protected routes
- Admin privilege checking

### Admin Panel (`/admin`)
- User management interface
- View all users in a table format
- User statistics dashboard
- Role-based filtering
- Admin-only access (regular users are denied)

### Dashboard (`/dashboard`)
- User profile display
- Role badge for admin users
- Quick access to admin panel for admins
- User-specific content

### Demo Page (`/admin-demo`)
- Interactive demo of admin functionality
- One-click login for both admin and regular users
- Shows the difference between admin and user access

## How to Test

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test Admin Access**:
   - Go to `/admin-demo`
   - Click "Login as Admin"
   - You'll be redirected to `/admin` where you can see the admin panel
   - Admin users can access both `/dashboard` and `/admin`

3. **Test Regular User Access**:
   - Go to `/admin-demo`
   - Click "Login as User"
   - Try to access `/admin` - you'll see "Access Denied"
   - Regular users can only access `/dashboard`

## File Structure

```
src/
├── components/
│   ├── admin-panel.tsx          # Admin dashboard component
│   ├── admin-login-demo.tsx     # Demo login interface
│   └── protected-route.tsx      # Route protection wrapper
├── contexts/
│   └── auth-context.tsx         # Authentication context with role support
├── app/
│   ├── admin/
│   │   └── page.tsx            # Admin panel page
│   ├── admin-demo/
│   │   └── page.tsx            # Demo page
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard
│   └── api/
│       ├── auth/login/
│       │   └── route.ts        # Login API endpoint
│       └── users/
│           └── route.ts        # User management API
└── public/
    └── users.json              # Sample user data
```

## Key Components

### AuthContext
- `isAdmin()` function to check admin privileges
- Role-aware user authentication
- Persistent login state

### AdminPanel
- Complete user management interface
- Statistics cards showing user counts
- Table view of all users with their roles
- Admin-only access protection

### ProtectedRoute
- Wraps pages that require authentication
- Redirects unauthenticated users to login

## Security Features

1. **Role-based Access Control**: Admin features are only accessible to users with `admin` role
2. **Route Protection**: Sensitive routes are protected and require authentication
3. **API Validation**: Backend validates user roles before granting access
4. **Password Protection**: User passwords are stored (in production, these should be hashed)

## Next Steps

For production use, consider implementing:

1. **Password Hashing**: Use bcrypt or similar to hash passwords
2. **JWT Tokens**: Implement proper JWT authentication
3. **Database Integration**: Replace JSON file with a proper database
4. **Enhanced Security**: Add rate limiting, CSRF protection, etc.
5. **User Management**: Add ability to create, edit, and delete users from admin panel
6. **Audit Logging**: Track admin actions for security purposes

## Usage Examples

### Check if user is admin in components:
```tsx
import { useAuth } from '@/contexts/auth-context';

function MyComponent() {
  const { isAdmin } = useAuth();
  
  return (
    <div>
      {isAdmin() && (
        <button>Admin Only Feature</button>
      )}
    </div>
  );
}
```

### Protect admin routes:
```tsx
import { ProtectedRoute } from '@/components/protected-route';
import { AdminPanel } from '@/components/admin-panel';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  );
}
```
