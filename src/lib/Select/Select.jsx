import React, { useMemo } from "react";
import Select from "react-select";
import useIsClient from "../../api/hooks/useClient";

const SelectField = ({ theme = {}, ...rest }) => {
  const isClient = useIsClient();

  const customStyle = useMemo(() => {
    return {
      ...theme,
      menuPortal: (base) => ({
        ...base,
        zIndex: 1000,
      }),
    };
  }, []);
  return (
    <Select
      menuPortalTarget={isClient ? document.body : null}
      maxMenuHeight={200}
      styles={customStyle}
      menuPosition="fixed"
      onInputChange={(value) => console.log("value", value)}
      {...rest}
    />
  );
};

export default SelectField;
