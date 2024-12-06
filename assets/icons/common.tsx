import React from "react";
import Svg, { Path } from "react-native-svg";
interface IconProps {
	w?: number;
	h?: number;
	color?: string;
}
export const PenIcon: React.FC<IconProps> = ({ w = 18, h = 18, color = "#F7CC15" }) => {
	return (
		<Svg width={w} height={h} viewBox='0 0 17 16' fill='none'>
			<Path d='M4 11l10-9-1.5-.5L3 10l1 1z' fill={color} />
			<Path
				d='M1.46 13.312l.587-2.15a1 1 0 011.671-.444l1.564 1.563a1 1 0 01-.444 1.672l-2.15.587a1 1 0 01-1.228-1.228z'
				fill={color}
			/>
			<Path
				d='M2.6 9.6l-1.106 3.87a1 1 0 001.237 1.236L6.6 13.6m-4-4l8.405-7.758a2.826 2.826 0 013.915.078v0a2.826 2.826 0 01-.081 4.075L6.6 13.6m-4-4l4 4'
				stroke='#1A1818'
				strokeWidth={1.5}
			/>
		</Svg>
	);
};

export const DeleteIcon: React.FC<IconProps> = ({ w = 18, h = 18, color = "black" }) => (
	<Svg width={w} height={h} viewBox='0 0 14 16' fill='none'>
		<Path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12.584 6l-1.774 8.735H3.19L1.417 6H0l2.032 10h9.936L14 6h-1.416z'
			fill='#1A1818'
		/>
		<Path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M7 12h1V5H7v7zM0 4h14V3H0v1zM5 1h5V0H5v1z'
			fill='#1A1818'
		/>
	</Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ w = 18, h = 18, color = "white" }) => (
	<Svg width={w} height={h} viewBox='0 0 12 12' fill='none'>
		<Path d='M6 1v10M11 6H1' stroke={color} strokeWidth={1.5} strokeLinecap='round' />
	</Svg>
);
