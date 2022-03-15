import {svgPathProperties as SvgPathProperties} from 'svg-path-properties';
import {squircleSVGPath, squircleSVGPathSize} from './SquircleShapes';

/**
 * Helper class for converting between coordinates and angles of the SVG path of the squircle shape.
 */
class SquirclePathProperties extends SvgPathProperties {
  radius: number

  /**
   * Intialize the path properties.
   * @param radius The radius use for the squircle shape.
   */
  constructor(radius: number) {
    super(squircleSVGPath);
    this.radius = radius
  }

  getSquircleLength() : number {
    return this.getTotalLength();
  }

  /**
   * Converts from a percent of the squircle to a point on the SVG path.
   * @param percent A number between 0 to 1 where 0 represents the top of the squircle and 0.5 represents the bottom (and 1 represents back to the top).
   * @returns A point on the SVG path in the form of an object with x and y properties.
   */
  getSquirclePointAtPercent(percent: number) : {x: number, y: number}  {
    const adjustedPercent = (percent + 0.5) % 1

    const {x , y} = this.getPointAtLength(this.getTotalLength() * adjustedPercent);
    
    return { x: x * ((this.radius * 2) / squircleSVGPathSize.width), y: y * ((this.radius * 2) / squircleSVGPathSize.height) }
  }

  /**
   * Converts from an angle of the squircle to a point on the SVG path.
   * @param angle A number between 0 to 360 where 0 represents the top of the squircle and 180 represents the bottom (and 360 represents back to the top).
   * @returns A point on the SVG path in the form of an object with x and y properties.
   */
  getSquirclePointAtAngle(angle: number) : {x: number, y: number} {
    return this.getSquirclePointAtPercent(angle / 360);
  }

  /**
   * Converts from a point on the SVG path to a percent of the squircle. Calculates the closest point on the path.
   * @param x X Coordinate of the point on the SVG path.
   * @param y Y Coordinate of the point on the SVG path.
   * @returns A number between 0 and 1 where 0 represents the top of the squircle, and 0.5 represents the bottom.
   */
  getPercentForSquirclePoint(x: number, y: number) : number {
    const cy = this.radius
    const cx = this.radius

    const theta = Math.atan2(y - cy, x - cx) + Math.PI
    const progress = ((theta + 1.5 * Math.PI) / (Math.PI * 2)) % 1
    return progress;
  }

    /**
   * Converts from a point on the SVG path to a angle of the squircle. Calculates the closest point on the path.
   * @param x X Coordinate of the point on the SVG path.
   * @param y Y Coordinate of the point on the SVG path.
   * @returns A number between 0 and 360 where 0 represents the top of the squircle, and 180 represents the bottom.
   */
  getAngleForSquirclePoint(x: number, y: number) : number {
    return this.getPercentForSquirclePoint(x, y) * 360;
  }
}

export default SquirclePathProperties
