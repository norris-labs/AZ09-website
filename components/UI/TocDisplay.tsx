import Box from '@mui/material/Box';

type TocDisplayProps = {
  first: string | number;
  second: string | number;
};

export function TocDisplay({ first, second }: TocDisplayProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        '.spacer': {
          width: '100%',
          height: '1px',
          position: 'absolute',
          bottom: '5px',
          borderBottom: '1px #acacac dotted',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '2px 5px 2px 0',
          background: 'white',
        }}
      >
        {first}
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '2px 0 2px 5px',
          background: 'white',
        }}
      >
        {second}
      </Box>
      <div className='spacer' />
    </Box>
  );
}
