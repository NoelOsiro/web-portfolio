'use client'
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import PageTransition from "./PageTransition";
import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import Footer from "./Footer";


interface PageSetupProps {
    children: ReactNode;
  }
  
export  function PageSetup({ children }: PageSetupProps) {
    return (
      <ThemeProvider>
        <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
  <Header />
  <PageTransition>
    <AnimatePresence mode="wait">
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  </PageTransition>
  <Footer />
</div>

      </ThemeProvider>
    );
  }