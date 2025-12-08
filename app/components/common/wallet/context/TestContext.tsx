// import { Context, createContext, ReactNode, useState } from "react";

// type TestContextType = {
// 	num: number,
// 	setNum: (num: number) => void,
// 	refetchNum: () => Promise<void>,
// }

// const TestContextType: TestContextType = {
// 		num: 0,
// 		setNum: (num: number) => {},
// 		refetchNum: async () => {},
// };

// export const TestContext: Context<TestContextType> = createContext<TestContextType>(TestContextType);
// export const TestProvider = ({ children }: { children: ReactNode })=> {
// 		const [num, setNum] = useState<number>(0);
// 		const refetchNum = async () => {
// 				await new Promise((resolve) => setTimeout(resolve, 1000));
// 				const newNum = num + 1;
// 				console.log("更新 num:", newNum);
// 				setNum(newNum);
// 		}
		
// 		return (
// 				<TestContext.Provider value={{ num, setNum, refetchNum }}>
// 						{children}
// 				</TestContext.Provider>
// 		)
// }
