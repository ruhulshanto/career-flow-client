import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";


import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './components/Provider/AuthProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './components/router/router';


Aos.init();

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>

    </div>
  </StrictMode>,
)
