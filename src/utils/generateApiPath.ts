// params 객체의 타입을 정의합니다.
type PathParams = Record<string, string | number>;

export const generateApiPath = (path: string, params: PathParams): string => {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`:${key}`, String(params[key])),
    path,
  );
};
