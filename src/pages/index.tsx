import { stripe } from "../services/stripe";
import styles from "./home.module.scss";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { GetStaticProps } from "next";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  
  console.log(product);
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            New about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all the publication
            <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId } />
        </section>

        <img
          className={styles.imgContent}
          src="/avatar.svg"
          alt="Girl coding"
        />
      </main>
    </>
  );
}

export const getStaticSideProps: GetStaticProps = async () => {
  const response = await stripe.prices.retrieve('price_1MC1jRIILL574ovrjJ6tDwjZ');

  console.log(response);

  const product = {
    productId: response.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(response.unit_amount! / 100),
  }

// trocar getServerSideProps:GetServerSideProps  por getStaticProps

  return {
    props: {
      product
    },

    revalidate: 60 * 60 * 24, //24 hours
  };
};
