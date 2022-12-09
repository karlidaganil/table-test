// 3rd Party
import { Checkbox, Form } from "antd";
import { Controller } from "react-hook-form";

const { Item } = Form;
function GdlCheckbox({ name, control, label, setValue }) {
  if (control._formValues[name] === undefined) {
    setValue(name, "N");
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Item>
          <Checkbox
            onChange={(event) => {
              field.onChange();
              if (event.target.checked) {
                setValue(name, "Y");
              } else {
                setValue(name, "N");
              }
            }}
            checked={field.value === "Y"}
          >
            {label}
          </Checkbox>
        </Item>
      )}
    />
  );
}

export default GdlCheckbox;
