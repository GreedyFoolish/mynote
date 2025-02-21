/**
 * 处理环境变量的值类型
 * @param env 环境变量对象
 * @returns 返回环境变量的对象
 */
export const processEnv = (env) => {
    const metaEnv = {};
    for (const key in env) {
        const wrapValue = env[key].trim().replace(/\\n/g, "\n");
        metaEnv[key] = env[key];

        if (wrapValue === "true" || wrapValue === "false") {
            metaEnv[key] = wrapValue === "true";
        }
        if (!isNaN(Number(wrapValue)) && wrapValue !== "") {
            metaEnv[key] = Number(wrapValue);
        }
    }
    return metaEnv;
};
