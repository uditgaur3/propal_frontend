# Page Titles Summary

This document lists all the unique page titles implemented across the proPAL AI application.

## Page Title Structure
All page titles follow the format: `[Page Name] - proPAL AI`

## Implemented Pages and Their Titles

### Main Application Pages
- **Home Page**: `Home - proPAL AI`
  - File: `src/app/page.tsx`
  - Description: Landing page with navigation and main content

- **Dashboard**: `Dashboard - proPAL AI`
  - File: `src/app/dashboard/page.tsx`
  - Description: User dashboard with profile information and quick actions (redirects to profile)

- **Profile**: `Profile - proPAL AI`
  - File: `src/app/dashboard/profile/page.tsx`
  - Description: User profile management with email and password update functionality

- **Agent Configuration**: `Agent Configuration - proPAL AI`
  - File: `src/app/dashboard/agent/page.tsx`
  - Description: Speech-to-Text provider, model, and language configuration interface

- **Admin Panel**: `Admin Panel - proPAL AI`
  - File: `src/app/admin/page.tsx`
  - Description: Admin-only interface for user management

- **Admin Demo**: `Admin Demo - proPAL AI`
  - File: `src/app/admin-demo/page.tsx`
  - Description: Interactive demo of admin functionality

### Authentication Pages
- **Login**: `Login - proPAL AI`
  - File: `src/app/login/page.tsx`
  - Description: User login page

- **Sign Up**: `Sign Up - proPAL AI`
  - File: `src/app/signup/page.tsx`
  - Description: User registration page

### Legal & Information Pages
- **Privacy Policy**: `Privacy Policy - proPAL AI`
  - File: `src/app/privacy-policy/page.tsx`
  - Description: Privacy policy and data protection information

- **Terms & Conditions**: `Terms & Conditions - proPAL AI`
  - File: `src/app/terms-conditions/page.tsx`
  - Description: Terms of service and user agreement

- **Cookie Policy**: `Cookie Policy - proPAL AI`
  - File: `src/app/cookie-policy/page.tsx`
  - Description: Cookie usage and management information

- **Contact Us**: `Contact Us - proPAL AI`
  - File: `src/app/contact/page.tsx`
  - Description: Contact form and company information

### Development/Testing Pages
- **Theme Test**: `Theme Test - proPAL AI`
  - File: `src/app/test/page.tsx`
  - Description: Theme toggle testing page

## Implementation Methods

### For Static Pages (Server Components)
Static pages use Next.js metadata export:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Name - proPAL AI",
  description: "Page description",
};
```

### For Client Components
Client components use `useEffect` to set document title:
```typescript
import { useEffect } from 'react';

export default function ClientPage() {
  useEffect(() => {
    document.title = "Page Name - proPAL AI";
  }, []);
  
  // Component content...
}
```

### Using Custom Hook (Alternative)
A custom hook is available for easier title management:
```typescript
import { usePageTitle } from '@/hooks/usePageTitle';

export default function ComponentPage() {
  usePageTitle("Page Name");
  
  // Component content...
}
```

## Layout Template
The root layout includes a title template that automatically appends "- proPAL AI" to all page titles:

```typescript
export const metadata: Metadata = {
  title: {
    template: "%s - proPAL AI",
    default: "proPAL AI - Proposal Management Platform",
  },
  // ...
};
```

## Benefits
1. **SEO Optimization**: Each page has a unique, descriptive title
2. **User Experience**: Browser tabs clearly identify the current page
3. **Consistency**: All titles follow the same format
4. **Maintainability**: Centralized title management through template
5. **Accessibility**: Screen readers can announce page titles properly

## Browser Tab Display
When users navigate through the application, they will see distinct titles in their browser tabs:
- `Home - proPAL AI`
- `Dashboard - proPAL AI`
- `Admin Panel - proPAL AI`
- `Login - proPAL AI`
- etc.

This ensures users can easily identify and navigate between different pages when multiple tabs are open.
