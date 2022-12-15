export default (path: string) => (!path ? '/assets/noname.png' : `${process.env.BASE_URL}${path}`);
