import { useState } from "react";
import { type NextPage } from "next";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { api } from "../utils/api";
import Header from "../components/shared/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

type TProductProps = {
  id: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  supply: number;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
};

const Product = ({
  id,
  category,
  name,
  price,
  rating,
  description,
  supply,
  yearlySalesTotal,
  yearlyTotalSoldUnits,
}: TProductProps) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          p="0.3rem"
          width="fit-content"
          border="solid 1px"
          borderRadius="5px"
          borderColor={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ color: theme.palette.secondary[400] }}
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {yearlySalesTotal}</Typography>
          <Typography>
            Yearly Units Sold This Year: {yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const ProductsPage: NextPage = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading } = api.product.getProducts.useQuery();
  console.log(data);
  return (
    <Box m="1.5rem 2rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {!isLoading && data ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          mt="1rem"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.data.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              description={product.description}
              rating={product.rating}
              supply={product.supply}
              yearlySalesTotal={product.productStat?.yearlySalesTotal}
              yearlyTotalSoldUnits={product.productStat?.yearlySalesTotal}
            />
          ))}
        </Box>
      ) : (
        <Box width="100%" textAlign="center" mt="2rem">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;
