import React, { useEffect, useState } from "react";

// ensure that your code interacts with the DOM only in the appropriate context.
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default useIsClient;
