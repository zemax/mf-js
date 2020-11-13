/**
 * Vector 2D
 */
export class Vector2D {
    /**
     * Constructor
     */
    constructor( x, y ) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * Add a Vector2D to this and return a new Vector2D as result
     *
     * @param    v
     * @return
     */
    addVector( v ) {
        return (new Vector2D( this.x + v.x, this.y + v.y ));
    }
    
    /**
     * Substract a Vector2D to this and return a new Vector2D as result
     *
     * @param    v
     * @return
     */
    substractVector( v ) {
        return (new Vector2D( this.x - v.x, this.y - v.y ));
    }
    
    /**
     * Multiply this by a number and return a new Vector2D as result
     *
     * @param    s
     * @return
     */
    multiply( s ) {
        return (new Vector2D( s * this.x, s * this.y ));
    }
    
    /**
     * The norm of the Vector2D
     *
     * @return
     */
    norm() {
        return (Math.sqrt( this.norm2() ));
    }
    
    /**
     * The squared norm of the Vector2D
     *
     * @return
     */
    norm2() {
        return ((this.x * this.x) + (this.y * this.y));
    }
    
    /**
     * Scalar product
     *
     * @param    v Vector2D
     * @return
     */
    scalarProduct( v ) {
        return (this.x * v.x + this.y * v.y);
    }
    
    /**
     * Dot product
     *
     * @param    v
     * @return
     */
    dotProduct( v ) {
        return (this.x * v.y - this.y * v.x);
    }
    
    /****************************************************************************************************
     * STATIC METHODS
     ****************************************************************************************************/
    
    /**
     * Intersection point between Vectors
     *
     * @param    o1    Vector1 Origin
     * @param    v1    Vector1 Direction
     * @param    o2    Vector2 Origin
     * @param    v2    Vector2 Direction
     *
     * @return
     */
    static intersection( o1, v1, o2, v2 ) {
        return (o1.addVector( v1.multiply( Vector2D.intersectionRatio( o1, v1, o2, v2 ) ) ));
    }
    
    /**
     * Intersection ratio (of the Vector1) between Vectors
     *
     * @param    o1    Vector1 Origin
     * @param    v1    Vector1 Direction
     * @param    o2    Vector2 Origin
     * @param    v2    Vector2 Direction
     *
     * @return
     */
    static intersectionRatio( o1, v1, o2, v2 ) {
        return (o2.substractVector( o1 ).dotProduct( v2 ) / v1.dotProduct( v2 ));
    }
    
    /**
     * Orthogonal projection of a point on a Vector
     *
     * @param    a    Projected point
     * @param    o    Vector Origin
     * @param    v    Vector Direction
     *
     * @return
     */
    static projection( a, o, v ) {
        return (o.addVector( v.multiply( Vector2D.projectionRatio( a, o, v ) ) ));
    }
    
    /**
     * Orthogonal projection ratio (of the Vector) of a point on a Vector
     *
     * @param    a    Projected point
     * @param    o    Vector Origin
     * @param    v    Vector Direction
     *
     * @return
     */
    static projectionRatio( a, o, v ) {
        return (v.scalarProduct( a.substractVector( o ) ) / v.norm2());
    }
    
    /**
     * Intersection between a Vector and a Polygon
     *
     * @param    o        Vector Origin
     * @param    v        Vector Direction
     * @param    points    Polygon points
     *
     * @return    Object with 3 arrays
     *    intersections    Intersections (2 max)
     *    polyIn            Polygon containing the first point of the original polygon
     *    polyOut            Polygon not containing the first point of the original polygon
     */
    static intersectPoly( o, v, points ) {
        const polyIn        = [];
        const polyOut       = [];
        const intersections = [];
        
        let found = 0;
        for ( let i = 0; i < points.length; i++ ) {
            const p1   = points[ i ];
            const p2   = points[ (i + 1) % points.length ];
            const p1p2 = p2.substractVector( p1 );
            
            switch ( found ) {
                case 0:
                case 2:
                    polyIn.push( p1 );
                    break;
                
                case 1:
                    polyOut.push( p1 );
                    break;
            }
            
            const r = Vector2D.intersectionRatio( p1, p1p2, o, v );
            
            if ( (r >= 0) && (r < 1) && (found < 2) ) {
                found++;
                
                const intersection = p1.addVector( p1p2.multiply( r ) );
                intersections.push( intersection );
                polyIn.push( intersection );
                polyOut.push( intersection );
            }
        }
        
        return ({
            intersections: intersections, polyIn: polyIn, polyOut: polyOut
        });
    }
}

export default Vector2D;
