import { createContext, useContext, useEffect, useRef, useState } from "react";

type RegisteredElement = {
  id: string;
  label: string;
};

type IntersectionContextType = {
  register: (element: RegisteredElement) => (el: HTMLElement | null) => void;
  activeSection: string | undefined;
  sections: RegisteredElement[];
  scrollTo: (id: string) => () => void;
};

const InterceptionContext = createContext<IntersectionContextType>({} as IntersectionContextType);

type IntersectionConfig = {
  threshold?: number;
  scrollBehavior?: ScrollBehavior;
};

type IntersectionProviderProps = {
  children: React.ReactNode;
  config?: IntersectionConfig;
};

const IntersectionProvider = ({ children, config }: IntersectionProviderProps) => {
  const { threshold = 0.5, scrollBehavior = 'smooth' } = config || {};
  const [activeSection, setActiveSection] = useState<string>();
  const refs = useRef<Record<string, HTMLElement>>({})

  const register = (element: RegisteredElement) => {
    return (e1: HTMLElement | null) => {
      const { id, label } = element;
      if (!e1) return;
      refs.current[id] = e1;
      refs.current[id].id = id;
      refs.current[id].ariaLabel = label;
    };
  };

  const scrollTo = (id: string) => () => {
    const element = refs.current[id];
    if (!element) return;
    element.scrollIntoView({ behavior: scrollBehavior });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setActiveSection(entry.target.id);
      });
    }, { root: null, rootMargin: '0px', threshold })

    Object.values(refs.current).forEach((section) => {
      if (!section) return;
      observer.observe(section);
    });

    return () => {
      Object.values(refs.current).forEach((section) => {
        if (!section) return;
        observer.unobserve(section);
      });
    };
  }, []);

  const getSections = () => {
    return Object.values(refs.current).map((ref) => ({ id: ref.id, label: ref.ariaLabel } as RegisteredElement));
  };

  return (
    <InterceptionContext.Provider value={{ register, activeSection, sections: getSections(), scrollTo }}>
      {children}
    </InterceptionContext.Provider>
  )
};

const useIntersection = () => {
  const context = useContext(InterceptionContext);
  if (Object.keys(context).length === 0) throw new Error('Should use hook inside provider');
  return context;
};


export { useIntersection, IntersectionProvider };
export type { IntersectionContextType, IntersectionConfig, RegisteredElement };

