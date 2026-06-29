import { useState } from 'react';

export const BuggyComponent = () => {
  const [shouldCrash, setShouldCrash] = useState<boolean>(false);

  if (shouldCrash) {
    throw new Error('Buggy component');
  }
  const handleError = () => setShouldCrash(true);

  return <button onClick={handleError}>create error</button>;
};
