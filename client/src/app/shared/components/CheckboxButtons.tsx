import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

type Props = {
     items:string[];
     checked: string[];
     onChange: (items:string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
     
     const [checkedItems, setCheckedItems] = useState(checked);

     // useEffect(() => {
     //      setCheckedItems(checked);
     // }, [checked]);

     const handleToggle = (value:string) => {
          const updatedCheckedItems = checkedItems?.includes(value)
           ? checkedItems.filter(item => item !== value)
           :[...checkedItems,value];

           setCheckedItems(updatedCheckedItems);
           onChange(updatedCheckedItems);
     }

     return (
          <FormControl>
               {items.map(item => (
                    <FormControlLabel
                         key={item}
                         control={
                              <Checkbox 
                                   color='secondary' 
                                   sx={{ py: 0.7, fontSize: 40 }}
                                   checked={checkedItems?.includes(item)}
                                   onClick={() => handleToggle(item)}
                              />}
                         label={item}
                    />
               ))}
          </FormControl>
     )
}