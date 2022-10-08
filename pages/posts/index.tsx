import { Box, ListItem, Select, UnorderedList, Text, Divider } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Post, User } from "../../types";

const Posts: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const posts: Post[] = props.posts;
  const users: User[] = props.users;

  const [query, setQuery] = useState<number>(1);

  const handleChange = (val: number) => {
    setQuery(val);
    router.push(`/posts?userId=${query}`);
  };

  return (
    <Box w={"full"} h={"fit-content"}>
      <Select onChange={(e) => handleChange(parseInt(e.target.value))}>
        {users.map((user: User) => (
          <option value={user.id}>{user.name}</option>
        ))}
      </Select>

      <Text fontSize={20} fontWeight={700} mt={10}>
        Posts
      </Text>
      <Divider />
      <UnorderedList listStyleType={"none"}>
        {posts.map((post: Post) => (
          <Box>
            <ListItem>
              <strong>Title: </strong>
              {post.title}
            </ListItem>
            <ListItem>
              <strong>Content: </strong>
              {post.body}
            </ListItem>
            <Divider p={2} />
          </Box>
        ))}
      </UnorderedList>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.userId;

  const postFetch = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const postData = await postFetch.json();

  const userFetch = await fetch("https://jsonplaceholder.typicode.com/users");
  const userData = await userFetch.json();

  return { props: { posts: postData, users: userData } };
};

export default Posts;
