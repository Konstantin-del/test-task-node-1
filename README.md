# test-task-node

CREATE TABLE IF NOT EXISTS products (
	id integer UNIQUE,
	product_article integer NOT NULL UNIQUE,
	product_name character(20) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product_in_shops (
	id integer UNIQUE,
	shop_name character(15),
	product_count integer NOT NULL,
	product_in_order integer NOT NULL,
	product_article integer NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE product_in_shops ADD CONSTRAINT product_in_shops_fk1 FOREIGN KEY (product_article) REFERENCES products (id);
