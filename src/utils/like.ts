const likes = (likes: Record<string, any>[]) => {
  return [
    "no one likes this",
    `${likes[0]?.firstName} ${likes[0]?.lastName} likes this`,
    `${likes[0]?.firstName} ${likes[0]?.lastName} and ${likes[1]?.firstName} ${likes[1]?.lastName} like this`,
    `${likes[0]?.firstName} ${likes[0]?.lastName}, ${likes[1]?.firstName} ${likes[1]?.lastName} and ${likes[2]?.firstName} ${likes[2]?.lastName} like this`,
    `${likes[0]?.firstName} ${likes[0]?.lastName}, ${likes[1]?.firstName} ${
      likes[1]?.lastName
    } and ${likes.length - 2} others like this`
  ][Math.min(4, likes.length)];
};

export default likes;
