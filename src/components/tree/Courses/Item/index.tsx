import Spinner from "components/shared/Spinner";
import React from "react";
import { IAuthorShortModel } from "components/tree/Admin/Events";
import { useRouter } from "next/router";
import { useGetCourseQuery } from "store/courses/api";
import SellingCourseItem from "./Selling";
import ViewingCourseItem from "./Viewing";

export interface ICourseTopic {
  id: string;
  title: string;
  description: string;
  linkToVideo: string;
}
export interface ICourseChapter {
  id: string;
  title: string;
  description: string;
  topics: ICourseTopic[];
}
export interface ICourseItem {
  id: string;
  authorShortModel: IAuthorShortModel;
  title: string;
  linkPayment: string;
  flagPayment: boolean;
  topics: ICourseTopic[];
  chapters: ICourseChapter[];
  image: string;
  description: string;
  category: string;
  features: string[];
}

interface IProps {}
const CourseItem: React.FC<IProps> = () => {
  const router = useRouter();

  const { data, isLoading } = useGetCourseQuery(
    {
      id: router?.query?.id,
    },
    {
      skip: !router?.query?.id,
    }
  );

  if (isLoading || !data) {
    <Spinner margin="200px auto" />;
  }

  if (data?.flagPayment) {
    return <SellingCourseItem data={data} />;
  }
  return <ViewingCourseItem data={data} />;
};

export default CourseItem;
