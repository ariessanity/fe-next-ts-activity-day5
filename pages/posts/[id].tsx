import { Box, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();

  const comment_res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  const comment_data = await comment_res.json();

  return {
    props: { post: data, comment: comment_data },
  };
};

const Post: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <Text fontSize={30} fontWeight={700}>
        {props.post.title}
      </Text>
      <Text fontSize={20} fontWeight={700}>
        {props.post.body}
      </Text>
      <Divider p={5} />
      {/* <Text fontSize={20}>{props.comment.name}</Text> */}
      <Text fontSize={20} fontWeight={700}>
        Comment
      </Text>
      <Divider />
      <ul style={{ listStyle: "none" }}>
        {props.comment.map((i: any) => {
          return (
            <li key={i.id}>
              <h1>Name: {i.name}</h1>
              <h1>Email: {i.email}</h1>
              <h1>{i.body}</h1>
              <Divider p={5} />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default Post;
