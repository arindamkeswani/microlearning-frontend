import React from "react";
import { useSelector } from "react-redux";
import { useGetProducts } from "../../../api/hooks/useGetProducts";
import Loader from "../../../lib/Loader/Loader";
import NoDataFound from "../../../lib/noDataFound/NoDataFound";
import Card from "../common/Card";
const CoursesScreen = () => {
  const { user } = useSelector((store) => store.user) || {};
  const {
    data: { data },
    isLoading,
  } = useGetProducts({
    params: {
      type: "batch",
      page: 1,
      limit: 50,
      userId: user[0]._id,
    },
    route: "/items/recommended",
  });
  const {
    data: { data: allData },
    isLoading: isFetching,
  } = useGetProducts({
    params: {
      type: "batch",
      page: 1,
      limit: 50,
      userId: user[0]._id,
    },
    route: "/items",
  });
  // const apiDatas = [
  //   {
  //     name: "Testing_batch_2 bdygcy dcbghsudgcuydg",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 0,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //       { id: "def", name: "there" },
  //       { id: "def", name: "there" },
  //       { id: "def", name: "there" },
  //       { id: "def", name: "there" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  //   {
  //     name: "Testing_batch_2",
  //     description: "This batch product is added only for tesitng purpose",
  //     urls: [
  //       "https://d2bps9p1kiy4ka.cloudfront.net/5eb393ee95fab7468a79d189/82db2f57-4ce4-4077-97c0-bd05f3289579.png",
  //     ],
  //     price: 500,
  //     discount: 10,
  //     tags: [
  //       { id: "abcd", name: "hello" },
  //       { id: "def", name: "there" },
  //     ],
  //     type: "batch",
  //     _id: "6527a49d910bd0daf208cbaf",
  //     createdAt: "2023-10-12T07:47:41.730Z",
  //     updatedAt: "2023-10-12T07:47:41.730Z",
  //     rating: 4.8,
  //     __v: 0,
  //   },
  // ];
  return (
    <div className="h-full overflow-auto">
      <div className="mx-3 my-5 ">
        <h3 className="font-medium text-2xl px-4 text-gray-600 mb-2 underline">
          Recommended
        </h3>
        <div className="container mx-auto p-4 flex gap-2 flex-wrap">
          {isLoading ? (
            <Loader />
          ) : data && data?.length > 0 ? (
            data?.map((data) => <Card data={data} key={data._id} />)
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
      <div className="mx-3 ">
        <h3 className="font-medium text-2xl px-4 text-gray-600 mb-2 underline">
          All Items
        </h3>
        <div className="container mx-auto p-4 flex gap-2 flex-wrap">
          {isFetching ? (
            <Loader />
          ) : allData && allData?.length > 0 ? (
            allData?.map((data) => <Card data={data} key={data._id} />)
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesScreen;
