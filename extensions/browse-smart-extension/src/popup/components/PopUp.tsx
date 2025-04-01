import { Box, Button, Switch, Typography } from '@mui/material';
import { useAdBlock } from '../../utils/hooks';
import { styled } from '@mui/material/styles';
const StyledBox = styled(Box)({
  padding: 2,
  width: 250,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
export const PopUp = () => {
  const { enabled, toggleBlocking, totalAdsBlocked, handleClick } =
    useAdBlock();
  return (
    <StyledBox>
      <Typography variant="h6">Ad Blocker</Typography>
      <Switch checked={enabled} onChange={toggleBlocking}></Switch>
      <Typography>Total Ads Blocked: {totalAdsBlocked}</Typography>
      <Button onClick={handleClick}>See Your Activity</Button>
    </StyledBox>
  );
};
