import React from 'react'

export default () => (
	<div className="container-fluid">
		<h1 className="p-0 m-0">Config.tsx</h1>
		<h2>Subtítulo</h2>
		<form onSubmit={(e: any) => e.preventDefault()}>
			<div className="">
				<input type="text" className="form-control" />
			</div>
		</form>
	</div>
)