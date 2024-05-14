import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled
} from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useParams, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  box-shadow: 0 4px 7px 0 gray;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  ${"" /* height: 100%; */}
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  //   get all the categories in Ascending Order so i need to sort the array

  const sortedCategories = [...categories].sort((a, b) =>
    a.type.localeCompare(b.type)
  );
  return (
    <>
      <StyledLink
        to={`/create?category=${category || ""}`} //'?categories = ${category || ''} appending because we have many categoties like music, travel
      >
        <StyledButton variant="contained"> Create Blog </StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
