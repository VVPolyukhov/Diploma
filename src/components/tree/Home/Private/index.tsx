import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import React from "react";

interface IProps {}
const PrivateHome: React.FC<IProps> = () => {
  return (
    <>
      <CommonTag>Статьи</CommonTag>
      <ReducedArticlesList />
      
      <CommonTag>Курсы</CommonTag>
    
    </>
  );
};

export default PrivateHome;
