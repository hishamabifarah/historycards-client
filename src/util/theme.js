export default {
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        },
        action: {
          light: '#ff3d00',
          main: '#ff3d00',
          dark: '#ff3d00',
          contrastText: '#fff'
      }
    },
    spreadableStyles: {
        typography: {
            useNextVariants: true
        },
        form: {
             textAlign: 'center'
        },
        image: {
            margin: '10px auto 10px auto'
        },
        pageTitle: {
            margin: '20px auto 20px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            marginTop: 10
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
          },
          visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
          },
          paper: {
            padding: 8
          },
          profile: {
            '& .image-wrapper': {
              textAlign: 'center',
              position: 'relative',
              '& button': {
                position: 'absolute',
                top: '50%',
                left: '70%'
              }
            },
            // '& .profile-image': {
            //   width: 200,
            //   height: 200,
            //   objectFit: 'cover',
            //   maxWidth: '100%',
            //   borderRadius: '50%'
            // },
            '& .profile-image': {
              width: 80,
              height: 80,
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: '50%'
            },
            
            '& .profile-details': {
              textAlign: 'center',
              '& span, svg': {
                verticalAlign: 'middle'
              },
              '& a': {
                color: '#00bcd4'
              }
            },
            '& hr': {
              border: 'none',
              margin: '0 0 10px 0'
            },
            '& svg.button': {
              '&:hover': {
                cursor: 'pointer'
              }
            }
          },
          buttons: {
            textAlign: 'center',
            '& a': {
              margin: '12px 2px'
            }
          }

    }
};