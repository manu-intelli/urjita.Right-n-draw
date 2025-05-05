import React from "react";

import CreationInterface from "./Page21Creation/CreationInterface";
import Page21FirstPage from "./Page21Creation/FirstPage";
import { usePage21Context } from "../../context/Page21Context";
import { FormSection } from "../../components/common/ReusableComponents";

const Page21Container = () => {
  const { state } = usePage21Context();

  const isFormInitialComplete = () =>
    state.technology &&
    state.opNumber &&
    state.opuNumber &&
    state.eduNumber &&
    state.modelFamily &&
    state.modelName;

  return (
    <>{isFormInitialComplete() ? <CreationInterface /> : <Page21FirstPage />}</>
  );
};

export default Page21Container;
