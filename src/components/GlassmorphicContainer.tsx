import React from 'react';

interface GlassmorphicContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassmorphicContainer: React.FC<GlassmorphicContainerProps> = ({
                                                                              children,
                                                                              className = ''
                                                                            }) => (
  <div className={`backdrop-blur-lg bg-white/30 border border-white/30 shadow-lg rounded-xl ${className}`}>
    {children}
  </div>
);