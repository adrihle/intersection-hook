import { useIntersection, IntersectionProvider } from '../src/intersection';

type Id = string;
type Label = string;

const SECTIONS: Record<Id, Label> = {
  section1: 'Section 1',
  section2: 'Section 2',
  section3: 'Section 3',
};

const Menu = () => {
  const { sections, activeSection, scrollTo } = useIntersection();
  return (
    <>
      {sections?.map(({ id, label }) => { 
        return(
        <a
          key={id}
          onClick={scrollTo(id)}
          style={{ color: id === activeSection ? 'red' : 'yellow', cursor: 'pointer' }}
          data-testid={`menu-${id}`}
        >
          {label}
        </a>
      )}
      )}
    </>
  );
};

const Content = () => {
  const { register } = useIntersection();

  return (
    <div>
      {Object.entries(SECTIONS).map(([id, label]) => (
        <div ref={register({ id, label })} data-testid={`content-${id}`} key={id}>{label}</div>
      ))}
    </div>
  );
};

const TestContainer = () => {
  return (
    <IntersectionProvider config={{ threshold: 0.8, scrollBehavior: 'instant' }}>
      <Menu />
      <Content />
    </IntersectionProvider>
  );
};

export { TestContainer, SECTIONS };
