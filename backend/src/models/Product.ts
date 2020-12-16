// Dependeces
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import moment from "moment";

/**
 * Product's Model of the database
 */
@Entity()
class Product {
    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "varchar", length: 50 })
    barCode!: string;

    @Column({ type: "varchar", length: 50 })
    descrption!: string;

    @Column({ type: "float" })
    stock!: number;

    // When the Category's models is ready, we must create the relationship with this model
    // category! Category;

    @Column({ type: "boolean", default: false })
    active!: boolean;

    @Column({ type: "timestamp", default: moment().format() })
    created!: Date | string;

    @Column({ type: "timestamp", default: moment().format() })
    update!: Date | string;
}

// Export class
export default Product;