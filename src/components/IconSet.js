import React from 'react';

export function IconCog(props) {
	const iconFill = props.fill || '#000';
	const iconHeight = props.height || "8";
	const iconWidth = props.width || "8";

	return (
		<svg className="icon-cog" xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 8 8">
			<title>Cog</title>
		  <path fill={iconFill} d="M3.5 0l-.5 1.19c-.1.03-.19.08-.28.13l-1.19-.5-.72.72.5 1.19c-.05.1-.09.18-.13.28l-1.19.5v1l1.19.5c.04.1.08.18.13.28l-.5 1.19.72.72 1.19-.5c.09.04.18.09.28.13l.5 1.19h1l.5-1.19c.09-.04.19-.08.28-.13l1.19.5.72-.72-.5-1.19c.04-.09.09-.19.13-.28l1.19-.5v-1l-1.19-.5c-.03-.09-.08-.19-.13-.28l.5-1.19-.72-.72-1.19.5c-.09-.04-.19-.09-.28-.13l-.5-1.19h-1zm.5 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />
		</svg>
	)
};

export function IconX(props) {
	const iconFill = props.fill || '#000';
	const iconHeight = props.height || "8";
	const iconWidth = props.width || "8";
	
	return (
		<svg className="icon-x" xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 8 8">
			<path fill={iconFill} d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z" />
		</svg>
	)
}

export function IconHome(props) {
	const iconFill = props.fill || '#000';
	const iconHeight = props.height || "8";
	const iconWidth = props.width || "8";

	return (
		<svg className="icon-home" xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 8 8">
			<title>Home</title>
		  <path fill={iconFill} d="M4 0l-4 3h1v4h2v-2h2v2h2v-4.03l1 .03-4-3z" />
		</svg>
	)
};

export function IconList(props) {
	const iconFill = props.fill || '#000';
	const iconHeight = props.height || "8";
	const iconWidth = props.width || "8";

	return (
		<svg className="icon-list" xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 8 8">
			<title>List</title>
		  <path fill={iconFill} d="M.5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6zm-1.5 2c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6zm-1.5 2c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6zm-1.5 2c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm1.5 0v1h6v-1h-6z" />
		</svg>
	)
};

export function IconPerson(props) {
	const iconFill = props.fill || '#000';
	const iconHeight = props.height || "8";
	const iconWidth = props.width || "8";

	return (
		<svg className="icon-person" xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 8 8">
			<title>List</title>
		  <path fill={iconFill} d="M4 0c-1.1 0-2 1.12-2 2.5s.9 2.5 2 2.5 2-1.12 2-2.5-.9-2.5-2-2.5zm-2.09 5c-1.06.05-1.91.92-1.91 2v1h8v-1c0-1.08-.84-1.95-1.91-2-.54.61-1.28 1-2.09 1-.81 0-1.55-.39-2.09-1z" />
		</svg>
	)
};