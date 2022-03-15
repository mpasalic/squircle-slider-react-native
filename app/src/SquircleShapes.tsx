import React from 'react';

import {StyleProp, ViewStyle} from 'react-native';
import * as NativeSvg from 'react-native-svg';
import {ClipPath, Defs, G, Mask, Rect, Circle, Use} from 'react-native-svg';
const {Svg, Path} = NativeSvg;

/**
 * SVG path for the squircle shape, based on a viewbox of width=277 and height=281.
 */
export const squircleSVGPath =
  'M138.497 281C88.1916 281 0.474609 191.77 0.474609 140.595C0.474609 89.4194 88.1916 0.189697 138.497 0.189697C188.808 0.189697 276.525 89.4194 276.525 140.595C276.525 191.77 188.808 281 138.497 281Z';

export const squircleSVGPathSize = {width: 277, height: 281};
export const squircleIconSize = {width: 50, height: 50};

/**
 * SVG implemention of a pie shape, configured from to fill from top clockwise to fill angle.
 * @param style Style for the pie shape.
 * @param radius Radius of the pie shape.
 * @param fillAngle Angle in degrees (0 - 360) where the pie should end (0 is the middle top, 90 is the middle right, and so on).
 * @param fillColor Color to fill the pie shape.
 * @param backgroundColor Color to fill the background of the pie shape.
 */
export const PieShape = ({
  style,
  radius,
  fillAngle,
  fillColor = 'black',
  backgroundColor = 'transparent',
}: {
  style?: StyleProp<ViewStyle>;
  radius: number;
  fillAngle: number;
  fillColor?: string;
  backgroundColor?: string;
}) => {
  const widthOuter = radius * 2;
  const heightOuter = radius * 2;
  const widthInner = 0;
  const heightInner = 0;
  const pieStartAngle = 0;

  const width = radius * 2;
  const height = radius * 2;

  const scaleX = widthOuter / squircleSVGPathSize.width;
  const scaleY = heightOuter / squircleSVGPathSize.height;

  const offsetX = (width - widthOuter) / 2;
  const offsetY = (height - heightOuter) / 2;

  const innerScaleX = widthInner / squircleSVGPathSize.width;
  const innerScaleY = heightInner / squircleSVGPathSize.height;

  const innerOffsetX = (width - widthInner) / 2;
  const innerOffsetY = (height - heightInner) / 2;

  function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  const x = radius;
  const y = radius;

  const start = polarToCartesian(x, y, radius, fillAngle);
  const end = polarToCartesian(x, y, radius, pieStartAngle);

  let largeArcFlag = '';
  if (pieStartAngle < fillAngle) {
    largeArcFlag = fillAngle - pieStartAngle <= 180 ? '0' : '1';
  } else {
    largeArcFlag = pieStartAngle - fillAngle <= 180 ? '1' : '0';
  }

  const path = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');

  const isFull = fillAngle >= 360;

  return (
    <>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        style={style}>
        <Defs>
          <Path
            id="arc"
            d={path}
            fill="none"
            stroke={fillColor}
            strokeOpacity={1.0}
            strokeWidth={radius * 2}
          />
          <Circle
            id="circle"
            cx={radius}
            cy={radius}
            r={radius}
            vectorEffect="non-scaling-stroke"
          />
          <ClipPath id="circle-clip">
            <Use href="#circle" />
          </ClipPath>

          <ClipPath id="outer-clip">
            <Path fillRule="evenodd" clipRule="evenodd" d={squircleSVGPath} />
          </ClipPath>
          <Mask id="outer-mask">
            <Rect width={width} height={height} fill="black"></Rect>
            <G
              transform={`translate(${offsetX}, ${offsetY}) scale(${scaleX}, ${scaleY})`}>
              <Rect
                width={squircleSVGPathSize.width}
                height={squircleSVGPathSize.height}
                clipPath="url(#outer-clip)"
                fill="white"></Rect>
            </G>
            <G
              transform={`translate(${innerOffsetX}, ${innerOffsetY}) scale(${innerScaleX}, ${innerScaleY})`}>
              <Rect
                width={squircleSVGPathSize.width}
                height={squircleSVGPathSize.height}
                clipPath="url(#outer-clip)"
                fill="black"></Rect>
            </G>
          </Mask>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={backgroundColor}></Rect>
        <G clipPath="url(#circle-clip)">
          {isFull ? (
            <Use href="#circle" fill={fillColor} />
          ) : (
            <Use href="#arc" fill={fillColor} />
          )}
        </G>
      </Svg>
    </>
  );
};

/**
 * SVG shape for the squircle.
 *
 * @param radius Radius of the shape.
 * @param fillColor Color to fill the pie shape.
 * @param backgroundColor Color to fill the background of the pie shape.
 * @param style Style for the shape.
 */
export const SquircleShape = ({
  radius,
  fillColor = 'black',
  backgroundColor = 'transparent',
  style,
}: {
  radius: number;
  fillColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const width = radius * 2;
  const height = radius * 2;

  const scaleX = width / squircleSVGPathSize.width;
  const scaleY = height / squircleSVGPathSize.height;

  const offsetX = 0;
  const offsetY = 0;

  return (
    <Svg
      width={width}
      height={height}
      style={[{width: width, height: height, overflow: 'hidden'}, style]}>
      <Defs>
        <ClipPath id={`outer-clip`}>
          <Path fillRule="evenodd" clipRule="evenodd" d={squircleSVGPath} />
        </ClipPath>
        <Mask id={`outer-mask`}>
          <Rect width={width} height={height} fill="white" />
          <G
            transform={`translate(${offsetX}, ${offsetY}) scale(${scaleX}, ${scaleY})`}>
            <Rect
              width={squircleSVGPathSize.width}
              height={squircleSVGPathSize.height}
              clipPath={`url(#outer-clip)`}
              fill="black"
            />
          </G>
        </Mask>
        <Mask id={`inner-mask`}>
          <Rect width={width} height={height} fill="black" />
          <G
            transform={`translate(${offsetX}, ${offsetY}) scale(${scaleX}, ${scaleY})`}>
            <Rect
              width={squircleSVGPathSize.width}
              height={squircleSVGPathSize.height}
              clipPath={`url(#outer-clip)`}
              fill="white"
            />
          </G>
        </Mask>
      </Defs>
      <G>
        <Rect
          width={width}
          height={height}
          mask={`url(#inner-mask)`}
          fill={fillColor}></Rect>
        <Rect
          width={width}
          height={height}
          mask={`url(#outer-mask)`}
          fill={backgroundColor}></Rect>
      </G>
    </Svg>
  );
};

/**
 * Squircle shaped slider icon.
 * @param borderColor Color of the border of the icon.
 * @param fillColor Color to fill the inner portion of the icon.
 * @param arrowColor Color of the inner arrow indicators.
 * @param style Style for the icon.
 */
export const SquircleSliderIcon = ({
  borderColor = 'white',
  fillColor = 'black',
  arrowColor = 'white',
  style,
}: {
  borderColor?: string;
  fillColor?: string;
  arrowColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={style}>
      <G>
        <Path
          d="M25 7C29.8744 7 39 16.1256 39 21C39 25.8743 29.8744 35 25 35C20.1257 35 11 25.8743 11 21C11 16.1256 20.1257 7 25 7Z"
          fill={fillColor}
        />
        <Path
          d="M25 7C29.8744 7 39 16.1256 39 21C39 25.8743 29.8744 35 25 35C20.1257 35 11 25.8743 11 21C11 16.1256 20.1257 7 25 7Z"
          stroke={borderColor}
        />
      </G>
      <Path
        d="M30.7527 21.2236L25.7527 24.6877L25.7527 17.7595L30.7527 21.2236Z"
        fill={arrowColor}
      />
      <Path
        d="M18.7527 21.2236L23.7527 17.7595L23.7527 24.6877L18.7527 21.2236Z"
        fill={arrowColor}
      />
    </Svg>
  );
};
