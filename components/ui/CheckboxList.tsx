import React from 'react';

function CheckboxList(
  {options, value, onValueChange}:{
    options: {
      value: string,
      label: string
    }[],
    value: string[],
    onValueChange: (value: string[]) => void
  }
) {
  return (
    <div className={"grid gap-2"}>
    </div>
  );
}

export default CheckboxList;
