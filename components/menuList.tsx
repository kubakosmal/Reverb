import {
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  ListIcon,
} from '@chakra-ui/layout'
import NextLink from 'next/link'

const MenuList = ({ listObject, withIcons }) => {
  return (
    <List spacing={2}>
      {listObject.map((item) => (
        <ListItem paddingX="20px" fontSize="16px" key={item.name}>
          <LinkBox>
            <NextLink href={item.route} passHref>
              <LinkOverlay>
                {withIcons ? (
                  <ListIcon
                    as={item.icon}
                    color={item.active ? 'white' : 'gray.300'}
                    marginRight="20px"
                  />
                ) : null}
                {item.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  )
}

export default MenuList
