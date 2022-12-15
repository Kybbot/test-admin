export default (value: string) => value.split(' ').map((item) => (item.length ? `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}` : item)).join(' ');
