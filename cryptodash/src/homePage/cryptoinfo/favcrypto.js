import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>

      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}

function FavoriteCrypto() {
  return(
    <Grid container justify="center" spacing={5}>
      <Grid item>
        <SimpleCard />
      </Grid>
      <Grid item>
        <SimpleCard />
      </Grid>
      <Grid item>
        <SimpleCard />
      </Grid>
    </Grid>
  );
}

export default FavoriteCrypto;