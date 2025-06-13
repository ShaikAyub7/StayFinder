import Form from "@/components/Form";
import { createProduct } from "@/utils/actions";
import React from "react";

function HostPage() {
  return <Form action={createProduct} />;
}

export default HostPage;
