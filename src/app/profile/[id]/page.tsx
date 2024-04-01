import React from "react";

const DynamicPage = ({ params }: any) => {
	return (
		<div className="bg-slate-300 h-screen w-full flex items-center justify-center flex-col">
			<h1>Profile Page</h1>
			<h2>{params.id}</h2>
		</div>
	);
};

export default DynamicPage;
