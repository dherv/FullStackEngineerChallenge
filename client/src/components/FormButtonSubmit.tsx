import { Button } from "antd";
import React, { FC } from "react";

const FormButtonSubmit: FC<{ disabled?: boolean }> = ({ disabled }) => {
  return (
    <Button
      style={{ marginTop: "1rem" }}
      key="submit"
      htmlType="submit"
      type="primary"
      disabled={disabled}
    >
      Submit
    </Button>
  );
};

export default FormButtonSubmit;
